import React from "react";
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe('Circle', ()=> {
    it('should render whithout letter', ()=> {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith letter', ()=> {
        const tree = renderer.create(<Circle letter="a"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith head', ()=> {
        const tree = renderer.create(<Circle head="test"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith react-element in head', ()=> {
        const tree = renderer.create(<Circle head={<Circle />}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith tail', ()=> {
        const tree = renderer.create(<Circle tail="test"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith react-element in tail', ()=> {
        const tree = renderer.create(<Circle tail={<Circle />}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith index', ()=> {
        const tree = renderer.create(<Circle index={1}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith prop isSmall === true', ()=> {
        const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith default state', ()=> {
        const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith changing state', ()=> {
        const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render whith modified state', ()=> {
        const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });


})