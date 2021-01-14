import React from "react";
import { MyTest } from "../src/lib/components/Test.js";
// import mdx from "./Test.mdx";

export default { title: "2_Components/MyTest" };

export const Primary = () => <MyTest>Hello</MyTest>;

export const Blue = () => <MyTest color="blue">Blue</MyTest>;

export const Green = () => <MyTest color="yellow">Green</MyTest>;
