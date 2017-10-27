module.exports = {
    "dataSource": "issues",
    "template": {
        "commit": "- [{{message}}]({{url}}) - @{{author}}",
        "issue": "- {{name}} [{{text}}]({{url}})",
        "noLabel": "closed"
    },
    "groupBy": {
        "已上线": ["MIP:已上线"],
        "已反馈": ["MIP:已反馈"],
        "已解决": ["MIP:已解决"],
        "讨论/问题": ["分类:讨论/问题"],
        "第三方:已提交": ["第三方:已提交"],
        "已关闭": ["closed"]
    }
};