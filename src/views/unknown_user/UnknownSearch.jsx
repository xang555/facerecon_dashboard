import React from "react";
import { Row, Col, Button, DatePicker, Form, Collapse } from "antd";
import moment from "moment";
import { axiosInstant } from "../../service/axios";
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
function callback(key) {}
class UnknownSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChangeDistance = (value) => {
    this.setState({ showClass: true });
  };
  fetchData = (startDate, endDate) => {
    axiosInstant()
      .get(`/access/search`, {
        params: {
          startDate,
          endDate,
        },
      })
      .then((res) => {
        this.props.setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  componentDidMount() {
    const startDate = moment().subtract(2, "d").toISOString();
    const endDate = moment().toISOString();
    this.fetchData(startDate, endDate);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.created_at !== undefined) {
          let start_date = moment(values.created_at[0]).toISOString();
          let end_date = moment(values.created_at[1]).toISOString();
          this.fetchData(start_date, end_date);
        }
      } else {
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={callback}
          style={{ marginBottom: "20px" }}
        >
          <Panel header="Filter" key="1">
            <Form onSubmit={this.handleSubmit}>
              <Row gutter={16}>
                <Col className="gutter-row" lg={12} sm={24}>
                  <Form.Item label="StartDate - EndDate">
                    {getFieldDecorator("created_at")(
                      <RangePicker format="DD/MM/YYYY" />
                    )}
                  </Form.Item>
                </Col>
                <Col className="gutter-row" lg={24} sm={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </>
    );
  }
}

export default Form.create()(UnknownSearch);
