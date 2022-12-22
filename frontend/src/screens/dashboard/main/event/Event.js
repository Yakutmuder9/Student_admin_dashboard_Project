import { useState } from "react";
import Button from "@mui/material/Button";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import "./event.css";
import { EventData } from "../../../app/shared/EventData";

const Event = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  return (
    <div className="" id="calenderBg">
      <div className="w-100 overflow-hidden d-flex px-3 rounded pt-2 pb-2 eventBox">
        
        <ScheduleComponent
          height="650px"
          currentView="Month"
          ref={(schedule) => setScheduleObj(schedule)}
          selectedDate={new Date(2022, 5, 20)}
          eventSettings={{ dataSource: EventData }}
          dragStart={onDragStart}
        >
          <ViewsDirective>
            {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
              <ViewDirective key={item} option={item} />
            ))}
          </ViewsDirective>

          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default Event;
