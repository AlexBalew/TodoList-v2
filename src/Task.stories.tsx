import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'TaskExample',
    component: Task,
} as ComponentMeta<typeof Task>;

const baseArgs = {
    changeTaskStatus: action('Task status was changed'),
    onChangeTitle: action('Task title was changed'),
    deleteTask: action('Exact task was deleted'),
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});

TaskExample.args = {
    ...baseArgs,
    task: {id: '48', taskName: 'Feed the cat', isDone: false},
    todolistId: 'TD1'
};
