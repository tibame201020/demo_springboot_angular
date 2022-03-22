import { alink } from './../side-bar/side-bar';
import { Sidebar } from "../side-bar/side-bar";

export const PUBLISH_SIDE_BAR_CONFIG: Sidebar = {
  title: "Publish Manage",
  alink: [
    {
      name: 'publish',
      link: '/publish/home'
    },
    {
      name: 'manage',
      link: '/publish/manage'
    }
  ]
}
