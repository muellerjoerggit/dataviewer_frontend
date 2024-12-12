// @ts-nocheck
import {useContext, useState} from "react";
import {Calendar} from "@/components/ui/calendar"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import DateChangeButtons from "@/components/DateChangeButtons.tsx";
import {FilterType} from "@/features/filter/filterTypes.ts";
import {ACTION_ADD_DATE_FILTER} from "@/features/filter/filterConstants.ts";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";

const FILTER_TYPE_EXACT = "1";
const FILTER_TYPE_BEFORE = "2";
const FILTER_TYPE_AFTER = "3";
const FILTER_TYPE_BETWEEN = "4";

const DATE_INTERVAL_DAY = 1;
const DATE_INTERVAL_MONTH = 2;
const DATE_INTERVAL_YEAR = 3;

export default function DateTimeFilterComponent({filterName,}: { filterName: string, }): JSX.Element {
  let date: Date | undefined = undefined;
  let filterType = FILTER_TYPE_AFTER;

  const [currentMonthState, setCurrentMonthState] = useState<Date | undefined>(getCurrentMonth)
  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;

  if (currentFilterData !== undefined) {
    date = currentFilterData.fromDateTime;
    filterType = currentFilterData.filterType;
  }

  function getCurrentMonth(): Date {
    if (date === undefined) {
      return new Date();
    }

    return date;
  }

  function changeSelect(filterTypeInput: string) {
    filterDispatcher({
      type: ACTION_ADD_DATE_FILTER,
      filterName: filterName,
      filterType: filterTypeInput,
      fromDateTime: date
    })
  }

  function changeDate(dateInput: Date) {
    filterDispatcher({
      type: ACTION_ADD_DATE_FILTER,
      filterName: filterName,
      filterType: filterType,
      fromDateTime: dateInput
    })
  }

  function changeDateInternal(interval: number, value: number) {
    let dateInternal = new Date();
    if (date !== undefined) {
      dateInternal = date;
    }

    let newDate = new Date(dateInternal);
    switch (interval) {
      case DATE_INTERVAL_DAY:
        newDate.setDate(newDate.getDate() + value);
        break;
      case DATE_INTERVAL_MONTH:
        newDate.setMonth(newDate.getMonth() + value);
        break;
      case DATE_INTERVAL_YEAR:
        newDate.setFullYear(newDate.getFullYear() + value);
        break;
    }
    setCurrentMonthState(newDate);
    changeDate(newDate);
  }

  return (
    <div className="grid grid-cols-2">
      <div className="grid grid-cols-1 place-content-start">
        <Select
          value={filterType}
          id={filterName + '_datetime_filter_type'}
          className="w-[280px]"
          onValueChange={changeSelect}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Filtertyp auswählen"/>
          </SelectTrigger>
          <SelectContent>
            {/*<SelectItem value={FILTER_TYPE_EXACT}>exakt am angegebenen Datum</SelectItem>*/}
            <SelectItem value={FILTER_TYPE_BEFORE}>bevor dem angegebenen Datum</SelectItem>
            <SelectItem value={FILTER_TYPE_AFTER}>nach dem angegebenen Datum</SelectItem>
            {/*<SelectItem value={FILTER_TYPE_BETWEEN}>zwischen den angegebenen Daten</SelectItem>*/}
          </SelectContent>
        </Select>
        <dl className="grid grid-cols-[20%_80%] mt-8">
          <dt>Woche</dt>
          <dd><DateChangeButtons
            dateChangeCallback={changeDateInternal} interval={DATE_INTERVAL_DAY}
            value={7}/>
          </dd>
          <dt>Monat</dt>
          <dd><DateChangeButtons
            dateChangeCallback={changeDateInternal} interval={DATE_INTERVAL_MONTH}
            value={1}/>
          </dd>
          <dt>Jahr</dt>
          <dd><DateChangeButtons
            dateChangeCallback={changeDateInternal} interval={DATE_INTERVAL_YEAR}
            value={1}/>
          </dd>
        </dl>
      </div>
      <div>
        <Calendar
          id={'datetime_' + filterName}
          mode="single"
          month={date}
          onMonthChange={setCurrentMonthState}
          selected={date}
          onSelect={changeDate}
          classNames={{month: "rounded-md border space-y-4"}}
        />
      </div>
    </div>
  );
}