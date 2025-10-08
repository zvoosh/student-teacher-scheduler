import {
  Button,
  Calendar,
  Col,
  Input,
  notification,
  Row,
  Select,
  theme,
  TimePicker,
} from "antd";
import {
  CalendarOutlined,
  CheckOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const defaultValues = {
  date: dayjs(),
  time: dayjs("00:00", "HH:mm"),
  studentId: null,
  studentFullname: null,
};

const HomePage = () => {
  const [textMessage, setTextMessage] = useState("");
  const [visibleStep, setVisibleStep] = useState("calendar");
  const [values, setValues] = useState(defaultValues);

  const queryClient = useQueryClient();

  const teacher = JSON.parse(sessionStorage.getItem("logedInUser"));

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const mutation = useMutation({
    mutationFn: (appointment) => {
      return axios.post(
        "http://localhost:3000/api/teacher-appointments",
        appointment
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      notification.success({
        message: "Appointment successfully created!",
        description: "Prepare for your appointment!",
      });
    },
    onError: () => {
      notification.error({
        message: "Error creating!",
        description: "Try again!",
      });
    },
  });

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const goToStep = (nextStep) => {
    setTimeout(() => {
      setVisibleStep(nextStep);
    }, 500);
  };

  const handleFinish = () => {
    const date = dayjs(values.date).format("DD/MM/YYYY");
    const teacherId = teacher.uid;
    const message = textMessage;
    const obj = {
      ...values,
      date,
      teacherId,
      message,
    };
    const nullArray = Object.values(obj).filter((item) => item == null);
    if (nullArray.length <= 0) {
      mutation.mutate(obj);
      setTextMessage("");
      setValues(defaultValues);
      goToStep("calendar");
    }
    if (nullArray.length > 0) {
      notification.error({
        message: "Error creating!",
        description: "Fill out all fields!",
      });
    }
  };

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid0cut.png"
          alt="tabloid about"
          className="w-full object-cover "
        />
      </div>
      <div className="h-fit !py-5 2xl:!py-20">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Schedule your appointment</h1>
        </div>
        <div className="flex justify-center !my-10 2xl:!my-20">
          <Row gutter={[42, 42]} justify="center" className="w-full 2xl:w-1/2">
            <Col xs={24} sm={12} className="flex items-stretch">
              <div className="flex gap-5 items-center p-4 w-full">
                <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                  <CalendarOutlined className="text-6xl" />
                </div>
                <div className="text-white font-semibold aboreto ">
                  WE SCHEDULE THE DATE FOR YOUR APPOINTMENT
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} className="flex items-stretch">
              <div className="flex gap-5 items-center p-4">
                <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                  <FieldTimeOutlined className="text-6xl" />
                </div>
                <div className="text-white font-semibold aboreto">
                  WE SCHEDULE THE TIME FOR YOUR APPOINTMENT
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} className="flex items-stretch">
              <div className="flex gap-5 items-center p-4">
                <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                  <UsergroupAddOutlined className="text-6xl" />
                </div>
                <div className="text-white font-semibold aboreto">
                  You get to choose your students
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} className="flex items-stretch">
              <div className="flex gap-5 items-center p-4">
                <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                  <CheckOutlined className="text-6xl" />
                </div>
                <div className="text-white font-semibold aboreto">
                  Approve scheduled appointments
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl 2xl:text-3xl !my-10">Schedule Appointment</h3>
          <div>
            <div className="relative w-[300px] sm:w-[400px] 2xl:w-[500px] min-h-[500px] overflow-hidden">
              {/* Calendar Panel */}
              <div
                className={`absolute flex flex-col items-center transition-opacity duration-500 ${
                  visibleStep === "calendar"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="text-center !mb-5">Select date</div>
                <div style={wrapperStyle}>
                  <Calendar
                    fullscreen={false}
                    value={values.date}
                    onSelect={(date) =>
                      setValues((prev) => ({ ...prev, date }))
                    }
                  />
                </div>
                <Button
                  type="primary"
                  onClick={() => goToStep("time")}
                  className="!mt-5"
                >
                  Next
                </Button>
              </div>

              {/* Time Picker Panel */}
              <div
                className={`w-full flex flex-col items-center absolute transition-opacity duration-500 ${
                  visibleStep === "time"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="text-center !mb-5">Select time</div>
                <TimePicker
                  className="w-1/2"
                  onChange={(time) => {
                    setValues((prev) => ({ ...prev, time }));
                  }}
                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                  format={"HH:mm"}
                  value={values.time}
                />
                <div className="flex">
                  <Button
                    type="primary"
                    onClick={() => goToStep("calendar")}
                    className="!mt-5 !mr-5"
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => goToStep("student")}
                    className="!mt-5"
                  >
                    Next
                  </Button>
                </div>
              </div>
              {/* Student Select Panel */}
              <div
                className={`w-full flex flex-col items-center absolute transition-opacity duration-500 ${
                  visibleStep === "student"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="text-center !mb-5">Select student</div>
                {data && (
                  <Select
                    placeholder="Select a student"
                    onChange={(value) => {
                      const parsedObj = JSON.parse(value);
                      setValues((prev) => ({
                        ...prev,
                        studentId: parsedObj.uid,
                        studentFullname: parsedObj.fullname,
                      }));
                    }}
                    className="w-1/2"
                  >
                    {data
                      .filter(
                        (user) => user.role == "student" && user.active == true
                      )
                      .map((student) => (
                        <Option
                          key={student.uid}
                          value={JSON.stringify({
                            fullname: student.fullname,
                            uid: student.uid,
                          })}
                        >
                          {student.fullname}
                        </Option>
                      ))}
                  </Select>
                )}
                <div className="flex">
                  <Button
                    type="primary"
                    onClick={() => goToStep("time")}
                    className="!mt-5 !mr-5"
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => goToStep("message")}
                    className={`!mt-5 !text-white ${
                      values.studentId == null && "!bg-gray-500"
                    }`}
                    disabled={values.studentId ? false : true}
                  >
                    Next
                  </Button>
                </div>
              </div>
              {/* Message Panel */}
              <div
                className={`w-full flex flex-col items-center absolute transition-opacity duration-500 ${
                  visibleStep === "message"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="text-center !mb-5">Write message</div>
                <TextArea
                  rows={7}
                  className="!pt-2"
                  placeholder="Write a message..."
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />
                <div className="flex">
                  <Button
                    type="primary"
                    onClick={() => goToStep("student")}
                    className="!mt-5 !mr-5"
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleFinish}
                    className="!mt-5"
                  >
                    Finish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { HomePage };
