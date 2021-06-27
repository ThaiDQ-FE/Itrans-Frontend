import React, { useEffect } from "react";
import "./styles.scss";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { withStyles } from "@material-ui/core/styles";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getFreeTimeDetailOfOrganization,
  getFreeTimeListOfOrganization,
} from "../../store/action/freeTime.action";

function ScheduleManagement() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const appointments = [];
  const listDetailFreeTimeOfOrganization = useSelector(
    (state) => state.freeTime.listDetailFreeTimeOfOrganization
  );
  const dispatch = useDispatch();
  const listFreeTimeOfOrganization = useSelector(
    (state) => state.freeTime.listFreeTimeOfOrganization
  );
  const detail = (schedule) => {
    let data = [];
    console.log(listDetailFreeTimeOfOrganization);
    for (
      let index = 0;
      index < listDetailFreeTimeOfOrganization.length;
      index++
    ) {
      if (schedule === listDetailFreeTimeOfOrganization[index].id) {
        data = [
          {
            key: "1",
            name: listDetailFreeTimeOfOrganization[index].nameOrganization,
            stage: listDetailFreeTimeOfOrganization[index].stage,
            money: listDetailFreeTimeOfOrganization[index].amountInvestor,
            percentageoOfShares:
              listDetailFreeTimeOfOrganization[index].shareInvestor,
            dateStart: listDetailFreeTimeOfOrganization[index].startDate,
            dateEnd: listDetailFreeTimeOfOrganization[index].endDate,
          },
        ];
      }
    }
    return data;
  };
  const Content = withStyles()(({ appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Table columns={columns} dataSource={detail(appointmentData.id)} />
    </AppointmentTooltip.Content>
  ));

  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Số tiền muốn gọi (VND)",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "Phần trăm cổ phần (%)",
      dataIndex: "percentageoOfShares",
      key: "percentageoOfShares",
    },
    {
      title: "Ngày gọi",
      dataIndex: "dateStart",
      key: "dateStart",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "dateEnd",
      key: "dateEnd",
    },
  ];

  let today = new Date().toISOString().slice(0, 10);

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  for (let index = 0; index < listFreeTimeOfOrganization.length; index++) {
    let time = listFreeTimeOfOrganization[index].dateTime.split(" ");
    let dayStart = parseInt(time[1]) - 7;
    let dayEnd = parseInt(time[1]) - 6;
    let year = time[0].split("-");
    year = year[2] + "-" + year[1] + "-" + year[0];
    let timeStart = year + "T" + pad(dayStart) + ":00:00.0000z";
    let timeEnd = year + "T" + pad(dayEnd) + ":00:00.0000z";
    const appointmentsChild = {
      title: listFreeTimeOfOrganization[index].investor,
      startDate: new Date(timeStart),
      endDate: new Date(timeEnd),
      id: listFreeTimeOfOrganization[index].idSchedule,
    };
    console.log(appointmentsChild);
    appointments.push(appointmentsChild);
  }

  useEffect(() => {
    dispatch(getFreeTimeListOfOrganization(userInfo.id));
    dispatch(getFreeTimeDetailOfOrganization());
  }, []);
  return (
    <div>
      <div>&nbsp;</div>
      <Paper id="paper">
        <Scheduler data={appointments} height={620}>
          <ViewState defaultCurrentDate={today} />
          <WeekView cellDuration={60} startDayHour={7} endDayHour={17} />
          <Appointments />
          <Toolbar />
          <DateNavigator />
          <AppointmentTooltip contentComponent={Content} />
        </Scheduler>
      </Paper>
      <div>&nbsp;</div>
    </div>
  );
}
export default ScheduleManagement;
