import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {Provider} from 'react-redux';

export default DragDropContext(HTML5Backend)(Provider);
