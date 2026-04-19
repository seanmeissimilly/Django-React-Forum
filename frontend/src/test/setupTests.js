import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { expect } from "vitest";

globalThis.expect = expect;

configure({ testIdAttribute: "data-testid" });
