/* eslint-disable no-undef */
import { html, fixture, expect, elementUpdated } from "@open-wc/testing";
import { spy } from "sinon";

import "./my-component";

describe("MyComponent", () => {
  it('has an input with a value of "hello"', async () => {
    const el = await fixture(html` <my-component></my-component> `);

    expect(el.shadowRoot.querySelector("span")).lightDom.to.equal("hello");
  });

  it("child component is rendered when toggle button is clicked", async () => {
    const el = await fixture(html` <my-component></my-component> `);
    const toggleButton = el.shadowRoot.querySelector("button");
    const toggle = () => toggleButton.click();
    setTimeout(toggle);

    await elementUpdated(el);

    const child = el.shadowRoot.querySelector("my-child");
    spy(child, "runLifeCycleMethod");

    setTimeout(() => child.connectedCallback());
    await elementUpdated(child);
    expect(child.runLifeCycleMethod.calledWith(child.hookMounted)).to.be.true;

    const count = child.shadowRoot.querySelector("#count");
    expect(child.msg).to.equal("hello");
    expect(count).lightDom.to.equal("0");

    const increaseButton = child.shadowRoot.querySelector("button");
    const increase = () => increaseButton.click();
    setTimeout(increase);

    await elementUpdated(child);
    expect(child.runLifeCycleMethod.calledWith(child.hookBeforeUpdate)).to.be
      .true;
    expect(child.runLifeCycleMethod.calledWith(child.hookUpdated)).to.be.true;
    expect(count).lightDom.to.equal("1");

    setTimeout(toggle);

    await elementUpdated(el);
    expect(el.shadowRoot.querySelector("my-child")).to.be.null;
    expect(child.runLifeCycleMethod.calledWith(child.hookUnmounted)).to.be.true;
  });
});
