import React from "react";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";


describe('Button', ()=> {
    it('should render with text', ()=> {
        const tree = renderer.create(<Button text="test text"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render without text', ()=> {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render disabled', ()=> {
        const tree = renderer.create(<Button disabled/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render while loading', ()=> {
        const tree = renderer.create(<Button isLoader={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call callback after click', ()=> {
        const callbackFunction = jest.fn();
        render(<Button onClick={callbackFunction} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(callbackFunction).toHaveBeenCalled();
    })
})

