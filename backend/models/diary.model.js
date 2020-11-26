module.exports = (sequelize, Sequelize) => {
    const Diary = sequelize.define("diary", {
        eventDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        }
    }, {
        scopes: {
            active: {
                where: {
                    isActive: true
                }
            }
        }
    });

    return Diary;
};