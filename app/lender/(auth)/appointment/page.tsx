import { AppointmentCalender } from "./appointment-calender";

const AppointmentPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="lender-page-title">Appointment Calendar</h1>
      <AppointmentCalender />
    </div>
  );
};

export default AppointmentPage;
