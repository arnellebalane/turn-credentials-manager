const fs = require('fs');
const path = require('path');
const Agenda = require('agenda');
const config = require('./index');

const agenda = new Agenda({
    db: {
        address: config.get('AGENDA_DATABASE_URL')
    }
});

const tasksPath = path.resolve(__dirname, '../tasks');

agenda.on('ready', () => {
    const tasks = fs.readdirSync(tasksPath).map(item => {
        const name = path.basename(item, '.js');
        const taskPath = path.resolve(tasksPath, name);
        require(taskPath)(agenda);
        return name;
    });

    if (tasks.length > 0) {
        agenda.start();
    }
});

function shutdownGracefully() {
    agenda.stop(() => process.exit(0));
}

process.on('SIGTERM', shutdownGracefully);
process.on('SIGINT', shutdownGracefully);

module.exports = agenda;
