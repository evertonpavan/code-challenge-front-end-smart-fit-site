"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, 
  // Control, useWatch 
} from "react-hook-form"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { Checkbox } from "./ui/checkbox"
import { Legends } from "./legends"
import { useQuery } from "@tanstack/react-query"
import { GetLocationsResponse, Location, getLocations } from "@/services/api/get-locations"
import { Skeleton } from "./ui/skeleton"
import { useEffect, useState } from "react"
import { Loader2Icon } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const FormSchema = z.object({
  period: z.enum(["06:00 às 12:00", "12:01 às 18:00", "18:01 às 23:00"]).optional(),
  closedUnits: z.boolean().default(true).optional()
})

export function ScheduleForm() {

  const [filterdLocations, setFilterdLocations] = useState<Location[]>()
  const [isLoandingSubmit, setIsLoandingSubmit] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      closedUnits: true
    }
  })

  const { data, isLoading: isLoadingLocations } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  useEffect(() => {
    setFilterdLocations(data?.locations)

  }, [data])


  function filterLocations(data: GetLocationsResponse | undefined, filters: z.infer<typeof FormSchema>) {
    const { closedUnits, period } = filters;

    let startHour: number, endHour: number;
    if (period) {
      [startHour, endHour] = formatPeriod(period);
    }

    const filtered = data && data.locations.filter(location => {
      const isOpen = location.opened;

      if ((!closedUnits || isOpen) && period && location.schedules) {

        const scheduleMatch = location.schedules.some(schedule => {
          const [scheduleStartHour, scheduleEndHour] = formatPeriod(schedule.hour);

          return startHour >= scheduleStartHour && endHour <= scheduleEndHour;
        });

        return isOpen && scheduleMatch;
      }

      return closedUnits || isOpen;
    });

    return filtered;
  }

  function formatPeriod(periodString: string) {

    if (periodString === 'Fechada') return []
    const hourParts = periodString.split('à');

    const hours = hourParts.map(part => {
      const hourMatch = part.match(/\d{2}/);
      return hourMatch ? Number(hourMatch[0]) : null;
    });

    return [Number(hours[0]), Number(hours[1])];
  }

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    setIsLoandingSubmit(true)

    await new Promise(async (resolve) => {
      setTimeout(() => {
        const { closedUnits } = dataForm;

        const response = filterLocations(data, dataForm)

        setFilterdLocations(response)

        setIsLoandingSubmit(false)

      }, 2000);
    })

  }

  // function ValuesWatched({ control }: { control: Control<z.infer<typeof FormSchema>> }) {
  //   const watched = useWatch({
  //     control,
  //   })

  //   return <p className="mt-6 bg-smartfit-yellow/70 p-2">
  //     filtros: {JSON.stringify(watched)}
  //   </p>
  // }

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  // Calculate pagination bundaries
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterdLocations?.slice(indexOfFirstItem, indexOfLastItem);


  function handlePageChange(page: number) {
    setCurrentPage(page);
  };

  return (
    <div className="w-full container md:max-w-[1280px] pb-20">
      <Card
        className="border-4"
      >
        <div className="flex items-center">
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <Image
              className=""
              src={'/images/icon-hour.png'}
              width={30}
              height={30}
              alt={'clock icon'}
            />
            <CardDescription
              className="text-base"
            >
              Horário
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-2xl text-muted-foreground/80">Qual período quer treinar?</FormLabel>
                    <Separator />
                    <FormControl>
                      <RadioGroup
                        disabled={isLoadingLocations || isLoandingSubmit}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-0"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="06:00 às 12:00" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg text-muted-foreground flex w-full item-center justify-between">
                            <p>Manhã</p>
                            <p>06:00 às 12:00</p>
                          </FormLabel>
                        </FormItem>
                        <Separator />

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="12:01 às 18:00" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg text-muted-foreground flex w-full item-center justify-between">
                            <p>Tarde</p>
                            <p>12:01 às 18:00</p>
                          </FormLabel>
                        </FormItem>
                        <Separator />

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="18:01 às 23:00" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg text-muted-foreground flex w-full item-center justify-between">
                            <p>Noite</p>
                            <p>18:01 às 23:00</p>
                          </FormLabel>
                        </FormItem>
                        <Separator />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex md:flex-row items-center gap-4 gap-y-4 justify-between pt-4 md:pt-8">
                <FormField
                  control={form.control}
                  name="closedUnits"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoadingLocations || isLoandingSubmit}
                        />
                      </FormControl>
                      <FormLabel className="text-base">
                        Exibir unidades fechadas
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <p className="">
                  Resultados encontrados: {' '}
                  <span className="text-lg font-extrabold">
                    {filterdLocations ? filterdLocations.length : 0}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-y-4 md:flex md:flex-row items-center gap-4 justify-center md:pt-4">
                <Button
                  type="submit"
                  className="w-full py-6 font-extrabold md:w-1/4 bg-smartfit-yellow text-black
                  hover:bg-smartfit-yellow/80 items-center"
                  disabled={isLoadingLocations || isLoandingSubmit}
                >
                  {isLoandingSubmit && (
                    <Loader2Icon className="h-5 w-5 animate-spin mr-4" />
                  )}
                  ENCONTRAR UNIDADE
                </Button>
                <Button
                  type="reset"
                  className="w-full py-6 md:w-1/4 font-extrabold"
                  variant={'outline'}
                  disabled={isLoadingLocations || isLoandingSubmit}
                >
                  LIMPAR
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <ValuesWatched control={form.control} /> */}

      <Legends />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoadingLocations && (
          <>
            <Skeleton className="h-[485px] w-full" />
            <Skeleton className="h-[485px] w-full" />
            <Skeleton className="h-[485px] w-full" />
          </>
        )}

        {currentItems && currentItems.map((location: Location) => (
          <div key={`location-${location.id}-${location.title}`} className="h-full">
            <div className="bg-smartfit-lighGrey/5 space-y-2 p-6 rounded-lg border-2 h-full shadow-md min-w-[290px] min-h-[546px]">
              <p className={`font-bold ${location.opened ? 'text-smartfit-green' : 'text-smartfit-red'}`}>
                {location.opened ? 'Aberto' : 'Fechado'}
              </p>
              <p className="text-3xl text-smartfit-darkGrey font-extrabold">
                {location.title}
              </p>
              {location.content &&
                <p className="pb-2 text-smartfit-lighGrey" dangerouslySetInnerHTML={{ __html: `${location.content}` }}>
                </p>
              }

              {location.street &&
                <p className="pb-2 text-smartfit-lighGrey">
                  {location.street}, {location.region}, {location.city_name}, {location.state_name}, {location.uf}
                </p>
              }

              {location.opened ? (
                <>
                  <Separator className="h-[3px] bg-border" />
                  <div className="flex items-center justify-center py-2">
                    <Image
                      src={`/images/${location.mask}-mask.png`}
                      width={80}
                      height={80}
                      alt="icon"
                      className="w-20"
                    />
                    <Image
                      src={`/images/${location.towel}-towel.png`}
                      width={80}
                      height={80}
                      alt="icon"
                      className="w-20"
                    />
                    <Image
                      src={`/images/${location.fountain}-fountain.png`}
                      width={80}
                      height={80}
                      alt="icon"
                      className="w-20"
                    />
                    <Image
                      src={`/images/${location.locker_room}-lockerroom.png`}
                      width={80}
                      height={80}
                      alt="icon"
                      className="w-20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {location.schedules?.map((schedule, index: number) => (
                      <div key={`schedule-${index}`}>
                        <p className="font-bold text-xl">{schedule.weekdays}</p>
                        <p className="text-lg">{schedule.hour}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}

        {!currentItems && !isLoadingLocations && (
          <p className="font-lg text-smartfit-red">
            Nenhuma unidade encontrada.
          </p>
        )}
      </div>

      <div className="py-4">
      {filterdLocations && filterdLocations.length > 0 && (
      <Pagination>
          <PaginationContent>
          <PaginationItem className="hidden md:block">
              <PaginationPrevious
                href="#"
                aria-label="Ir para página anterior"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>

              <>
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}

                {Array.from({ length: Math.min(4, Math.ceil(filterdLocations.length / itemsPerPage)) }, (_, index) => {
                  const pageNumber = currentPage > 2 ? currentPage - 2 + index : index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {currentPage < Math.ceil(filterdLocations.length / itemsPerPage) - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(Math.ceil(filterdLocations.length / itemsPerPage))}
                      >
                        {Math.ceil(filterdLocations.length / itemsPerPage)}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
              </>
            
            <PaginationItem className="hidden md:block">
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(filterdLocations.length / itemsPerPage)))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      </div>
    </div>
  )
}