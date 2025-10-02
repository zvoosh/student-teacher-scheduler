import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return axios.post("http://localhost:3000/api/users", user);
    },
    onSuccess: (response) => {
      const user = response.data;

      sessionStorage.setItem("user", JSON.stringify(user));

      notification.success({
        message: "Successful registration!",
        description: "Welcome in!",
      });
      queryClient.invalidateQueries("users");
      navigate("/page/about");
    },
    onError: () => {
      notification.error({
        message: "Error with registration!",
        description: "Try again!",
      });
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-1/2 h-scren bg-gray-800 text-white !p-5 overflow-hidden">
      <h2 className="text-2xl font-bold !mb-5 text-center">Register</h2>
      <div className="w-full h-full flex justify-center items-center">
        <Form
          form={registerForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row justify="center" gutter={[12, 12]}>
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
                name={"password"}
                label={<span className="text-white text-xl">Password</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input type="password" placeholder="Password..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"fullname"}
                label={<span className="text-white text-xl">Full name</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name",
                  },
                ]}
              >
                <Input placeholder="Full name..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"role"}
                label={<span className="text-white text-xl">Role</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your role",
                  },
                ]}
              >
                <Select
                  className="w-full"
                  placeholder="Select role..."
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "student", label: "Student" },
                    { value: "teacher", label: "Teacher" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"} className="!mt-5 flex items-center">
            <Link className="!mr-5" to={"/"}>
              Login
            </Link>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { RegisterPage };
