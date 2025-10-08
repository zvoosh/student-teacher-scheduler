import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const StudentsPage = () => {
  const [activeUsers, setActiveUsers] = useState();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["activeusers"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (uid) => {
      return axios.delete(`http://localhost:3000/api/user/${uid}`);
    },
    onSuccess: () => {
      notification.success({
        message: "Student deleted!",
        description: "Student deleted successfully!",
      });
      queryClient.invalidateQueries("activeusers");
    },
    onError: () => {
      notification.error({
        message: "Error with deleting student!",
        description: "Try again!",
      });
    },
  });
  const editMutation = useMutation({
    mutationFn: (student) => {
      return axios.put(
        `http://localhost:3000/api/approve/student/${student.uid}`,
        student
      );
    },
    onSuccess: () => {
      notification.success({
        message: "Student approved!",
        description: "Student approved successfully!",
      });
      queryClient.invalidateQueries("activeusers");
    },
    onError: () => {
      notification.error({
        message: "Error with approving student!",
        description: "Try again!",
      });
    },
  });

  useEffect(() => {
    if (data) {
      const preparedData = data.filter((user) => user.active == false) || [];
      setActiveUsers(preparedData);
    }
  }, [data]);

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        console.log("record", record);
        return (
          <Row justify={"center"}>
            <Button type="primary">
              <CheckOutlined
                onClick={() => {
                  editMutation.mutate(record);
                }}
              />
            </Button>
            <Button type="primary" className="!ml-5 !bg-red-500">
              <DeleteOutlined
                onClick={() => {
                  deleteMutation.mutate(record.uid);
                }}
              />
            </Button>
          </Row>
        );
      },
    },
  ];

  return (
    <div className="w-full !p-5 2xl:!p-0 xl:w-3/5 2xl:w-3/5 h-full">
      <div className="relative w-full 2xl:h-96 overflow-hidden">
        <img
          src="/images/tabloid5cut.jpg"
          alt="tabloid about"
          className="w-full object-cover"
        />
      </div>
      <div className="h-fit !py-5 2xl:!py-10">
        <div className="w-full text-center !mb-5 2xl:!mb-10">
          <h1 className="text-xl 2xl:text-4xl">Approve Registered Students</h1>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={activeUsers}
            rowKey={(index) => index}
          />
        </div>
      </div>
    </div>
  );
};

export { StudentsPage };
