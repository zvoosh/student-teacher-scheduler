import { Button, Calendar, Col, Row, theme } from "antd";

const AboutPage = () => {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className="w-3/5 h-full">
      <div className="relative w-full h-fit overflow-hidden">
        <img
          src="/images/tabloid0cut.png"
          alt="tabloid about"
          className="w-full object-cover "
        />
        <div className="aboreto absolute font-bold text-4xl top-45 left-10 text-black">
          Schedule your appointment
        </div>
      </div>
      <div className="h-fit !py-20">
        <div className="w-full text-center !mb-10">
          <h1 className="text-4xl">Schedule your appointment</h1>
        </div>
        <div className="flex justify-center !my-20">
          <Row gutter={[42, 42]} justify="center" className="w-1/2">
            <Col span={12}>
              <div className="flex gap-5 items-center p-4">
                <div className="w-2/5 h-[100px] bg-gray-500"></div>
                <div className="text-white font-semibold">
                  WE SCHEDULE THE DATE FOR YOUR APPOINTMENT
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="flex gap-5 items-center p-4">
                <div className="w-2/5 h-[100px] bg-gray-500"></div>
                <div className="text-white font-semibold">
                  WE SCHEDULE THE DATE FOR YOUR APPOINTMENT
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div className="flex gap-5 items-center p-4">
                <div className="w-2/5 h-[100px] bg-gray-500"></div>
                <div className="text-white font-semibold">
                  WE SCHEDULE THE DATE FOR YOUR APPOINTMENT
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="flex gap-5 items-center p-4">
                <div className="w-2/5 h-[100px] bg-gray-500"></div>
                <div className="text-white font-semibold">
                  WE SCHEDULE THE DATE FOR YOUR APPOINTMENT
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl !my-10">Schedule Appointment</h3>
          <div>
            <div className="text-center !mb-5">Select date</div>
            <div style={wrapperStyle}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            <Row justify={'end'} className="!mt-5">
                <Button type="primary">Next</Button>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export { AboutPage };
