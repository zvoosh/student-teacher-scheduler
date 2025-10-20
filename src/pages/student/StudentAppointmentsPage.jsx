import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Col, Row, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const StudentAppointmentsPage = () => {
  const [filteredData, setFilteredData] = useState();

  const loggedInUser = JSON.parse(sessionStorage.getItem("logedInUser"));

  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: () =>
      axios
        .get("https://back.appointment.dusanprogram.eu/api/appointments")
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      const myData = data.filter((item) => item.studentId === loggedInUser.uid);
      setFilteredData(myData);
    }
  }, [data]);

  const handleNoApprovableAppoitments = (data) => {
    const unApproved = data.filter((item) => item.approved == true);
    if (unApproved.length <= 0) {
      return (
        <div className="w-full text-center text-lg font-bold underline underline-offset-4">
          No approven appoitments
        </div>
      );
    }
    return;
  };

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid7cut.jpg"
          alt="tabloid about"
          className="w-full object-cover"
        />
      </div>
      <div className="h-fit !py-5 2xl:!py-10">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Approved appointments</h1>
        </div>
      </div>
      <div className="flex justify-center !my-10 2xl:!my-20">
        {/* Appointment cards */}
        <Row gutter={[42, 42]} justify="center" className="w-full ">
          {filteredData ? (
            filteredData.map((appointment, index) => {
              if (appointment.approved)
                return (
                  <Col
                    xs={24}
                    sm={12}
                    lg={10}
                    xl={12}
                    xxl={8}
                    className="flex items-stretch"
                    key={index}
                  >
                    <div className="flex flex-col rounded-lg">
                      <div className="flex justify-between items-center text-lg font-bold bg-purple-600 !p-2 rounded-t-lg">
                        <div>
                          <div>
                            {dayjs(appointment.dateTime._seconds * 1000).format(
                              "dddd, D MMMM YYYY"
                            )}
                          </div>
                          <div>
                            {dayjs(appointment.dateTime._seconds * 1000).format(
                              "HH:mm"
                            )}
                            h
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center rounded-b-lg bg-white text-black !p-2">
                        <div className="flex items-center">
                          <div className="border rounded-4xl !p-2 !px-3 !mr-5 text-2xl">
                            <UserOutlined />
                          </div>
                          <div className="font-bold text-lg">
                            {appointment.studentFullname}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
            })
          ) : (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          )}
        </Row>
        {/* Appointment cards end*/}
      </div>
      {data && handleNoApprovableAppoitments(data)}
    </div>
  );
};

export { StudentAppointmentsPage };
