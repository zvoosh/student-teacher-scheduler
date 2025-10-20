import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { TextArea } = Input;

const BookAppoitmentPage = () => {
  const [bookForm] = Form.useForm();

  const { data } = useQuery({
    queryKey: ["teacher"],
    queryFn: () =>
      axios
        .get("https://back.appointment.dusanprogram.eu/api/teacher")
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const mutation = useMutation({
    mutationFn: (appointment) => {
      return axios.post(
        "https://back.appointment.dusanprogram.eu/api/student-appointments",
        appointment
      );
    },
    onSuccess: () => {
      bookForm.resetFields();
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

  const handleFinish = (values) => {
    values.dateTime = dayjs(values.dateTime).format("DD/MM/YYYY HH:mm");
    values.studentFullname = values.fullname;
    values.studentId = JSON.parse(sessionStorage.getItem("logedInUser")).uid;
    delete values.fullname;
    mutation.mutate(values);
  };

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid4cut.jpg"
          alt="tabloid about"
          className="w-full object-cover"
        />
      </div>
      <div className="h-fit !py-20">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Book an appointment</h1>
        </div>
        <div className="relative overflow-y-auto overscroll-contain px-4">
          <Form
            form={bookForm}
            name="basic"
            autoComplete="off"
            onFinish={handleFinish}
            className="flex w-full flex-col items-center !p-5"
          >
            <Row gutter={[24, 24]} className="w-full !mb-10" justify={"center"}>
              <Col xs={24} sm={12} lg={10} xl={12} xxl={12}>
                <Form.Item
                  name={"fullname"}
                  label={
                    <span className="text-white text-sm md:text-lg lg:text-2xl">
                      Full name:
                    </span>
                  }
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                  ]}
                >
                  <Input placeholder="Your full name..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={10} xl={12} xxl={12}>
                <Form.Item
                  name={"email"}
                  label={
                    <span className="text-white text-sm md:text-lg lg:text-2xl">
                      Email:
                    </span>
                  }
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                  ]}
                >
                  <Input placeholder="Your email..." type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={10} xl={12} xxl={12}>
                <Form.Item
                  name={"teacherId"}
                  label={
                    <span className="text-white text-sm md:text-lg lg:text-2xl">
                      Teacher:
                    </span>
                  }
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "Please select your teacher",
                    },
                  ]}
                >
                  {data && (
                    <Select placeholder="Select a teacher" className="w-1/2">
                      {data.map((teacher) => (
                        <Select.Option key={teacher.uid} value={teacher.uid}>
                          {teacher.fullname}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={10} xl={12} xxl={12}>
                <Form.Item
                  name="dateTime"
                  label={
                    <span className="text-white text-sm md:text-lg lg:text-2xl">
                      Date & time:
                    </span>
                  }
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your date and time.",
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    className="w-full"
                    placeholder="Select date..."
                    showTimegetPopupContainer={(trigger) =>
                      trigger.parentElement
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]} className="w-full" justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"message"}
                  label={
                    <span className="text-white text-sm md:text-lg lg:text-2xl">
                      Message:
                    </span>
                  }
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Write your teacher a note..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="w-full" justify={"center"}>
              <Button type="primary" className="!px-5" htmlType="submit">
                Book
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { BookAppoitmentPage };
