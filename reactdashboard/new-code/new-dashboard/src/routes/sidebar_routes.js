import React from "react";
import PeopleIcon from "@material-ui/icons/People";

const sidebarRoutes = [
    {
      id: "Meetup Manager APIs",
      children: [
        { id: "Timeline API", icon: <PeopleIcon />, targetUrl: "/timelineapi", active: true }
      ]
    }
  ];

  export default sidebarRoutes;