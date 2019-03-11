import React, { Component } from "react";
import {    
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { Card } from "../creative-tim-components/Card/Card.jsx";
import { FormInputs } from "../creative-tim-components/FormInputs/FormInputs.jsx";
import Button from "../creative-tim-components/CustomButton/CustomButton.jsx";


class CreateEvent extends Component {
    render() {
        return(
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
      );
    }
}

export default CreateEvent;