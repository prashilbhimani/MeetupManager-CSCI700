import React, { Component } from "react";
import {    
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";
import { thArray, tdArray } from "variables/Variables.jsx";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Posts from "components/Posts/Posts";
import Postform from "../../components/PostForm/Postform";
class UserProfile extends Component {
  render() {
    return (
      <div className="content">
      <Postform />
      <hr/>
      <Posts />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Collect Event"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "EventName",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Event Name",
                          defaultValue: "Demo Event 1",
                          disabled: false
                        },
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "sharans003@gmail.com",
                          defaultValue: "sharans003",
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Keywords",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Keywords",
                          defaultValue: "keyword1, keyword2, keyword3"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Information about Event",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "InformationAboutEvent",
                          defaultValue:
                            "I'm collecting data for epic analytics. The data is related to disasters!"
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Start Event
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>          
        </Grid>
        <Grid fluid>
          <Col md={12}>
                <Card
                  title="Previously Collected Events"
                  category="All the previous events that were collected for our use."
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {tdArray.map((prop, key) => {
                          return (
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>{prop}</td>;
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  }
                />
              </Col>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
