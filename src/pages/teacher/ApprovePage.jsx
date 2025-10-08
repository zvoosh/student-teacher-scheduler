import axios from "axios";
import dayjs from "dayjs";
import {
  CheckOutlined,
  DeleteOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, notification, Row, Spin } from "antd";

const ApprovePage = () => {
  const queryClient = useQueryClient();
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

  const approveMutation = useMutation({
    mutationFn: (id) => {
      return axios.put(`https://back.appointment.dusanprogram.eu/api/approve/appointment/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      notification.success({
        message: "Appointment successfully approved!",
        description: "We just approved the appointment!",
      });
    },
    onError: () => {
      notification.error({
        message: "Error approving!",
        description: "Contact support!",
      });
    },
  });

  const handleNoApprovableAppoitments = (data) => {
    const unApproved = data.filter((item) => item.approved == false);
    if (unApproved.length <= 0) {
      return (
        <div className="w-full text-center text-lg font-bold underline underline-offset-4">
          No appoitments to approve
        </div>
      );
    }
    return;
  };

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid2cut.png"
          alt="tabloid about"
          className="w-full object-cover"
        />
      </div>
      <div className="h-fit !py-5 2xl:!py-10">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Pending appointments</h1>
        </div>
        <div className="flex justify-center !my-10 2xl:!my-20">
          {/* Appointment cards */}
          <Row gutter={[42, 42]} justify="center" className="w-full ">
            {data ? (
              data.map((appointment, index) => {
                if (!appointment.approved)
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
                          <div>
                            <div>
                              {dayjs(
                                appointment.dateTime._seconds * 1000
                              ).format("dddd, D MMMM YYYY")}
                            </div>
                            <div>
                              {dayjs(
                                appointment.dateTime._seconds * 1000
                              ).format("HH:mm")}
                              h
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

                            <div className="font-normal border text-md !p-1 !px-2 rounded-lg text-white bg-green-500 border-green-500 cursor-pointer">
                              <CheckOutlined
                                onClick={() => {
                                  approveMutation.mutate(appointment.id);
                                }}
                              />
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
    </div>
  );
};

export { ApprovePage };
