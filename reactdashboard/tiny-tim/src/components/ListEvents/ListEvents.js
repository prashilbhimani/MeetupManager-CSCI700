
import React, { Component } from "react";
import {    
  Grid,
  Col,
  Table
} from "react-bootstrap";
import { thArray, tdArray } from "variables/Variables.jsx";
import { Card } from "../creative-tim-components/Card/Card.jsx";

class ListEvents extends Component {
    render() {
        return (
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
        );
    }
}


export default ListEvents;