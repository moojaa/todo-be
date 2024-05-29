const Task = require("../model/Task")

const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const {userId} = req
        const newTask = new Task({ task, isComplete ,author:userId})
        await newTask.save()
        res.status(200).json({ status: 'ok', data: newTask })
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
}

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v").populate("author")
        res.status(200).json({ status: "ok", data: taskList })
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
}

taskController.putTask = async (req, res) => {
    try {
        const taskPut = await Task.findById(req.params.id)
        if (!taskPut) {
            throw new Error("찾을 수 없는 리스트 입니다")
        }
        const fields = Object.keys(req.body)
        fields.map((item) => (taskPut[item] = req.body[item]))
        await taskPut.save()
        res.status(200).json({ status: 'ok', data: taskPut })

    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
}

taskController.delTask = async(req,res)=>{
    try{
        const taskDel = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: 'ok', data: taskDel })
    }catch(err){
        res.status(400).json({ status: 'fail', error: err })
    }
}

module.exports = taskController