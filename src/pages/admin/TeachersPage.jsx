import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Search } = Input;

const TeachersPage = () => {
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filterData, setFilterData] = useState();
  const queryClient = useQueryClient();
  const loggedInUser = JSON.parse(sessionStorage.getItem("logedInUser"));

  const { data } = useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      axios.get("https://back.appointment.dusanprogram.eu/api/teacher").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      setFilterData(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (teacher) => {
      return axios.post("https://back.appointment.dusanprogram.eu/api/teachers", teacher);
    },
    onSuccess: () => {
      notification.success({
        message: "New teacher added!",
        description: "Teacher created successfully!",
      });
      queryClient.invalidateQueries("teachers");
      setIsCreateOpen(false);
    },
    onError: () => {
      notification.error({
        message: "Error with new teacher creation!",
        description: "Try again!",
      });
    },
  });

  const editMutation = useMutation({
    mutationFn: (teacher) => {
      return axios.put(
        `https://back.appointment.dusanprogram.eu/api/teachers/${teacher.uid}`,
        teacher
      );
    },
    onSuccess: () => {
      notification.success({
        message: "Teacher edited!",
        description: "Teacher edited successfully!",
      });
      queryClient.invalidateQueries("teachers");
      setIsEditOpen(false);
    },
    onError: () => {
      notification.error({
        message: "Error with editing teacher!",
        description: "Try again!",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (uid) => {
      return axios.delete(`https://back.appointment.dusanprogram.eu/api/user/${uid}`);
    },
    onSuccess: () => {
      notification.success({
        message: "Teacher deleted!",
        description: "Teacher deleted successfully!",
      });
      queryClient.invalidateQueries("teachers");
    },
    onError: () => {
      notification.error({
        message: "Error with deleting teacher!",
        description: "Try again!",
      });
    },
  });

  const handleSearch = (value) => {
    if (data) {
      if (value.length <= 0) {
        return setFilterData(data);
      }
      const search = value.toLowerCase();
      const searchedData = data.filter((item) => {
        return Object.values(item).some((val) => {
          return String(val).toLowerCase().includes(search);
        });
      });
      setFilterData(searchedData);
    }
  };

  const onFinish = (values) => {
    const obj = {
      ...values,
      role: "teacher",
    };
    mutation.mutate(obj);
    createForm.resetFields();
  };

  const onEditFinish = (values) => {
    editMutation.mutate(values);
    editForm.resetFields();
  };

  const handleEducation = (edu) => {
    const param = edu.toLowerCase();
    if (param == "bs") {
      return "Bachelor's";
    }
    if (param == "phd") {
      return "Docstor's";
    }
    if (param == "ms") {
      return "Master's";
    }
    if (param == "el") {
      return "Elementary's";
    }
    if (param == "hs") {
      return "High School's";
    }
    if (param == "none") {
      return "No diploma";
    }
  };

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid6cut.jpg"
          alt="tabloid about"
          className="w-full object-cover"
        />
      </div>
      <div className="h-fit !py-5 2xl:!py-10">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Teachers</h1>
        </div>
        <div className="flex flex-col items-center justify-center !my-10 2xl:!my-20">
          <div className="w-full flex flex-col justify-start !mb-10">
            {loggedInUser.role === "admin" && (
              <div
                className="border !px-2 !py-1 max-w-fit !mb-5 cursor-pointer select-none"
                onClick={() => {
                  setIsCreateOpen(true);
                }}
              >
                Add Teacher
              </div>
            )}
            <div className="!mb-5">
              <Search
                placeholder="input search text"
                onSearch={(value) => handleSearch(value)}
                style={{ width: 200 }}
              />
            </div>
            <Row gutter={[42, 42]} justify="start" className="w-full ">
              {filterData ? (
                filterData.map((teacher, index) => {
                  return (
                    <Col
                      xs={24}
                      sm={12}
                      lg={6}
                      className="flex items-stretch"
                      key={index}
                    >
                      <div className="flex flex-col rounded-lg">
                        <div className="flex justify-between items-center text-lg bg-purple-500 font-bold rounded-lg">
                          <div className="flex items-center justify-center">
                            <div className="h-full !p-8 text-4xl">
                              <UserOutlined />
                            </div>
                            <div className="capitalize !ml-2 !py-2">
                              <div>
                                {teacher.fullname}
                                {` (${handleEducation(teacher.education)})`}
                              </div>
                              <div>
                                {teacher.teacherRole
                                  ? teacher.teacherRole
                                  : teacher.role}
                              </div>
                              {loggedInUser.role === "admin" && (
                                <div className="!mt-1">
                                  <span className="underline underline-offset-4 !mr-5 cursor-pointer select-none">
                                    <EditOutlined
                                      onClick={() => {
                                        setIsEditOpen(true);
                                        setTimeout(() => {
                                          editForm.resetFields();
                                          editForm.setFieldsValue(teacher);
                                        }, 0);
                                      }}
                                    />
                                  </span>
                                  <span className="underline underline-offset-4 cursor-pointer select-none">
                                    <DeleteOutlined
                                      onClick={() => {
                                        deleteMutation.mutate(teacher.uid);
                                      }}
                                    />
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <div className="text-lg text-center w-full undeline undeline-offset-4">
                  Not teachers found
                </div>
              )}
            </Row>
            {/* Appointment cards end*/}
          </div>
        </div>
        <Modal
          title="Create Teacher"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isCreateOpen}
          onCancel={() => {
            setIsCreateOpen(false);
            createForm.resetFields();
          }}
          footer={null}
          destroyOnHidden={true}
        >
          <Form
            form={createForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Row justify="center" gutter={[6, 6]}>
              <Col span={24}>
                <Form.Item
                  name={"username"}
                  label={<span className="text-md">Username</span>}
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
                  label={<span className="text-md">Password</span>}
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
                  label={<span className="text-md">Full name</span>}
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
                  name={"teacherRole"}
                  label={<span className="text-md">Teacher Role</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your role",
                    },
                  ]}
                >
                  <Select
                    className="w-full"
                    placeholder="Select teacher role..."
                    options={[
                      { value: "english Teacher", label: "English Teacher" },
                      { value: "math Teacher", label: "Math Teacher" },
                      {
                        value: "programming Teacher",
                        label: "Programming Teacher",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"end"} className="!mt-5 flex items-center">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Row>
          </Form>
        </Modal>
        <Modal
          title="Edit Teacher"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isEditOpen}
          onCancel={() => {
            setIsEditOpen(false);
          }}
          footer={null}
          destroyOnHidden={true}
        >
          <Form
            form={editForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={onEditFinish}
          >
            <Row justify="center" gutter={[6, 6]}>
              <Col span={24} className="!hidden">
                <Form.Item
                  name={"uid"}
                  label={<span className="text-md">ID</span>}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"username"}
                  label={<span className="text-md">Username</span>}
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
                  label={<span className="text-md">Password</span>}
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
                  label={<span className="text-md">Full name</span>}
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
                  name={"teacherRole"}
                  label={<span className="text-md">Teacher Role</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your role",
                    },
                  ]}
                >
                  <Select
                    className="w-full"
                    placeholder="Select teacher role..."
                    options={[
                      { value: "english Teacher", label: "English Teacher" },
                      { value: "math Teacher", label: "Math Teacher" },
                      {
                        value: "programming Teacher",
                        label: "Programming Teacher",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"end"} className="!mt-5 flex items-center">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export { TeachersPage };
