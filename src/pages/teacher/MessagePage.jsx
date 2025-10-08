import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Input, notification, Row, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Search } = Input;

const MessagePage = () => {
  const [filteredData, setFilteredData] = useState();

  const queryClient = useQueryClient();
  const loggedinuser = JSON.parse(sessionStorage.getItem("logedInUser"));

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () =>
      axios
        .get("https://back.appointment.dusanprogram.eu/api/appointments")
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`https://back.appointment.dusanprogram.eu/api/appointments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      notification.success({
        message: "Appointment successfully deleted!",
        description: "We just canceled the appointment!",
      });
    },
    onError: () => {
      notification.error({
        message: "Error deleting!",
        description: "Contact support!",
      });
    },
  });

  useEffect(() => {
    if (data)
      setFilteredData(
        data.filter(
          (item) => item.approved == true && item.teacherId == loggedinuser.uid
        )
      );
  }, [data]);

  const onSearch = (value) => {
    if (value === "") {
      if (data)
        setFilteredData(
          data.filter(
            (item) =>
              item.approved == true && item.teacherId == loggedinuser.uid
          )
        );
      return;
    }

    const preparedData = data.filter((appointment) => {
      if (
        appointment.approved == true &&
        appointment.teacherId == loggedinuser.uid
      ) {
        const studentFullNameMatch = appointment.studentFullname
          ?.toLowerCase()
          .includes(value.toLowerCase());
        const messageMatch = appointment.message
          ?.toLowerCase()
          .includes(value.toLowerCase());
        const dateMatch = dayjs(appointment.dateTime._seconds * 1000)
          .format("dddd, D MMMM YYYY")
          .toLowerCase()
          .includes(value.toLowerCase());

        return studentFullNameMatch || messageMatch || dateMatch;
      }
      return;
    });

    setFilteredData(preparedData);
  };

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
  }

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid3cut.jpg"
          alt="tabloid about"
          className="w-full object-cover"
        />
      </div>
      <div className="h-fit !py-5 2xl:!py-10">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Appointment Messages</h1>
        </div>
        <div className="flex flex-col items-center justify-center !my-10 2xl:!my-20">
          <div className="w-full flex justify-start !mb-10">
            {filteredData &&
              data.filter((item) => item.approved == true).length > 0 && (
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
              )}
          </div>
          {/* Appointment cards */}
          <Row gutter={[42, 42]} justify="center" className="w-full ">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((appointment, index) => {
                if (appointment.approved == false) {
                  return;
                }
                return (
                  <Col
                    xs={24}
                    sm={12}
                    lg={6}
                    className="flex items-stretch"
                    key={index}
                  >
                    <div className="flex flex-col rounded-lg">
                      <div className="flex justify-between items-center text-lg font-bold bg-purple-600 !p-2 rounded-t-lg">
                        <div className="flex flex-col">
                          <div className="capitalize">
                            {appointment.studentFullname}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="font-normal !mr-2 border !p-1 !px-2 rounded-md border-red-500 text-white bg-red-500 cursor-pointer">
                            <DeleteOutlined
                              onClick={() => {
                                mutation.mutate(appointment.id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center rounded-b-lg bg-white text-black !p-2">
                        <div className="flex items-center">
                          <div className="font-bold text-lg">
                            {appointment.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <div className="w-full text-center text-lg font-bold underline underline-offset-4">
                No appoitment messages found
              </div>
            )}
          </Row>
          {/* Appointment cards end*/}
        </div>
      </div>
    </div>
  );
};

export { MessagePage };
