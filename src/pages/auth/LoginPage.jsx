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
      axios
        .get("https://back.appointment.dusanprogram.eu/api/users")
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const onFinish = (values) => {
    const matchedUser = data?.find(
      (user) =>
        user.username === values.username &&
        user.password === values.securePassword
    );

    if (matchedUser) {
      notification.success({
        message: "Successful login!",
        description: `Welcome back, ${matchedUser.username}`,
      });
      sessionStorage.setItem("logedInUser", JSON.stringify(matchedUser));
      if (matchedUser.role == "teacher") {
        navigate("/page/home");
      }
      if (matchedUser.role == "admin") {
        navigate("/page/teachers");
      }
      if (matchedUser.role == "student") {
        navigate("/page/teachers");
      }
    } else {
      notification.error({
        message: "Error while loging in!",
        description: `Try again or register`,
      });
    }
  };

  return (
    <div className="w-full xl:w-1/2 2xl:w-1/2 h-1/2 xl:h-screen 2xl:h-screen bg-gray-800 text-white !p-5 overflow-hidden">
      <h2 className="text-2xl font-bold !mb-5 text-center">Login</h2>
      {/* Login Form */}
      <div className="w-full h-full flex justify-center items-center">
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
                label={<span className="text-white text-xl">Username</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your username",
                  },
                ]}
              >
                <Input placeholder="Username..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="securePassword"
                label={<span className="text-white text-xl">Password</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password",
                  },
                ]}
              >
                <Input.Password
                  id="secure-password"
                  name="secure-password"
                  autoComplete="secure-password"
                  placeholder="Enter your password..."
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"} className="!mb-5 flex items-center">
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
  );
};

export { LoginPage };
