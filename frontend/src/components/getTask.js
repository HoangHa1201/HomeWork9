import { useState } from "react"
function GetTask({ onGetTask }) {
    const [title, setTitle] = useState(onGetTask.title);
    const [time, setTime] = useState(onGetTask.time);
    const [reminder, setReminder] = useState(onGetTask.reminder);
    const [updated, setUpdated] = useState(onGetTask.updated);
    const [image, setImage] = useState(onGetTask.image);

    return (
        <div>
            <div className={`task ${reminder ? 'reminder' : ''}`} >
                <label>Task</label>
                <input
                    type='text'
                    placeholder="Add Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Time</label>
                <input
                    type='text'
                    placeholder="Add Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <br />
                <p>Created: {onGetTask.created}</p>
                <p>Updated: {updated}</p>
                <br />
                <label>Image</label>
                <input
                    type='file'
                    accept="image/*"
                    value={""}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                <label>Set reminder</label>
                <input
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.target.checked)}
                />
                <br />
                <input
                    type="submit"
                    value="Update Task"
                    className="btn btn-block"
                />
            </div>
        </div>
    );
}

export default GetTask;