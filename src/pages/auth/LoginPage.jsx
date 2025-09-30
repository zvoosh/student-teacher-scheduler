import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, notification, Row } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const onFinish = (values) => {
    const matchedUser = data?.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (matchedUser) {
      notification.success({
        message: "Successful login!",
        description: `Welcome back, ${matchedUser.username}`,
      });
      sessionStorage.setItem("logedInUser", JSON.stringify(matchedUser));
      navigate("/page/about");
    } else {
      notification.error({
        message: "Error while loging in!",
        description: `Try again or register`,
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-800 !p-5">
      <div className="text-white text-center text-2xl font-bold">
        Student - Teacher Appointment Scheduler
      </div>
      <div className="w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-2/9 h-fit bg-white rounded-md text-black !p-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl font-bold !mb-5">Login</h2>
        <div>
          <Form
            form={loginForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Row justify="center">
              <Col span={24}>
                <Form.Item
                  name={"username"}
                  label={<span className="aboreto">Username</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username",
                    },
                  ]}
                >
                  <Input placeholder="Username..."/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"password"}
                  label={<span className="aboreto">Password</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password..."/>
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"end"} className="!mt-5 flex items-center">
              <Link className="!mr-5" to={"/register"}>
                Register
              </Link>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
