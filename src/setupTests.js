import '@testing-library/jest-dom/extend-expect';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({adapter: new Adapter()});