import {Template} from 'meteor/templating'
import {Tasks} from "../api/tasks";

import './task.html'
import {ReactiveDict} from "meteor/reactive-dict";

Template.task.onCreated(function() {
    this.state = new ReactiveDict()
})

Template.task.helpers({
    isEdit() {
        const instance = Template.instance()
        return instance.state.get('isEdit')
    }
})

Template.task.events({
    'click .toggle-checked'() {
        Tasks.update(this._id, {
            $set: {checked: !this.checked}
        })
    },
    'click .delete'() {
        Tasks.remove(this._id)
    },
    'click .text'() {
        const instance = Template.instance()
        return instance.state.set('isEdit', true)
    },
    'click .edit'() {
        const instance = Template.instance()
        const value = instance.$('input.text-input').val()
        Tasks.update(this._id, {
            $set: {text: value}
        })
        return Template.instance().state.set('isEdit', false)
    },
    'click .edit-cancel'() {
        return Template.instance().state.set('isEdit', false)
    }
})
