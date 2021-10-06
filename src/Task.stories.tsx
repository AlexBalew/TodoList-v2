import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TaskExample',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

const baseArgs = {
    changeTaskStatus: action('Task status was changed'),
    onChangeTitle: action('Task title was changed'),
    deleteTask: action('Exact task was deleted'),
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskExample.args = {
    ...baseArgs,
    task: {id: '48', taskName: 'Feed the cat', isDone: false},
    todolistId: 'TD1'
};
