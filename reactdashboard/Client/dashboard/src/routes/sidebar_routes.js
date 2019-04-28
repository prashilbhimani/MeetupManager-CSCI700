import React from "react";
import PeopleIcon from "@material-ui/icons/People";

const sidebarRoutes = [
    {
      id: "Meetup Events API",
      children: [
        { id: "Events API", icon: <PeopleIcon />, targetUrl: "/eventsapi"}, 
      ]
    },
    {
      id: "Meetup Groups APIs",
      children: [
        { id: "Groups API", icon: <PeopleIcon />, targetUrl: "/groupapi"}, 
      ]
    },
  ];

  export default sidebarRoutes;