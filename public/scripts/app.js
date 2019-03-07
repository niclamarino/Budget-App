"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BudgetApp = function (_React$Component) {
  _inherits(BudgetApp, _React$Component);

  function BudgetApp(props) {
    _classCallCheck(this, BudgetApp);

    var _this = _possibleConstructorReturn(this, (BudgetApp.__proto__ || Object.getPrototypeOf(BudgetApp)).call(this, props));

    _this.handleAddExpense = _this.handleAddExpense.bind(_this);
    _this.handleDeleteExpense = _this.handleDeleteExpense.bind(_this);
    _this.state = {
      totalExpenses: 0,
      expenseList: [{ name: "Adopt a puppy", cost: 500 }, { name: "Dog Food", cost: 50 }, { name: "Dog Leash", cost: 20 }, { name: "Dog Bowls", cost: 15 }],
      totalBudget: 0
    };
    return _this;
  }

  _createClass(BudgetApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //todo
      console.log('componentDidMount');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      //todo
      console.log('componentDidUpdate');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
    }
  }, {
    key: "handleAddExpense",
    value: function handleAddExpense(expense) {
      this.setState(function (prevState) {
        return {
          expenseList: prevState.expenseList.concat(expense)
        };
      });
    }
  }, {
    key: "handleDeleteExpense",
    value: function handleDeleteExpense() {
      //todo
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(Header, {
          totalBudget: this.state.totalBudget, totalExpenses: this.state.totalExpenses
        }),
        React.createElement(AddExpense
        // expenseList={this.state.expenseList}
        , { handleAddExpense: this.handleAddExpense
        }),
        React.createElement(Expenses, { expenseList: this.state.expenseList })
      );
    }
  }]);

  return BudgetApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    "header",
    null,
    React.createElement(
      "h1",
      null,
      "Budget: $ ",
      props.totalBudget
    ),
    React.createElement(
      "h2",
      null,
      "Total Expenses: $ ",
      props.totalExpenses
    )
  );
};

var AddExpense = function (_React$Component2) {
  _inherits(AddExpense, _React$Component2);

  function AddExpense(props) {
    _classCallCheck(this, AddExpense);

    var _this2 = _possibleConstructorReturn(this, (AddExpense.__proto__ || Object.getPrototypeOf(AddExpense)).call(this, props));

    _this2.handleAddExpense = _this2.handleAddExpense.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddExpense, [{
    key: "handleAddExpense",
    value: function handleAddExpense(e) {
      e.preventDefault();
      var name = e.target.elements.name.value.trim();
      var cost = e.target.elements.cost.value;
      this.props.handleAddExpense({ name: name, cost: cost });
    }
  }, {
    key: "render",
    value: function render() {
      var style = { background: "#daffdc" //todo remove --temporary bc chrome devtools doesn't show outlines for me
      };return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Add an Expense"
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleAddExpense },
          React.createElement("input", { style: style, type: "text", name: "name", placeholder: "Expense Name" }),
          React.createElement("input", { style: style, type: "number", name: "cost", placeholder: "$" }),
          React.createElement(
            "button",
            { style: style },
            "Add"
          )
        )
      );
    }
  }]);

  return AddExpense;
}(React.Component);

var Expenses = function Expenses(props) {
  return React.createElement(
    "section",
    { id: "expenses" },
    React.createElement(
      "h4",
      null,
      "Expenses"
    ),
    props.expenseList.map(function (expense) {
      return React.createElement(Expense, {
        key: expense.name,
        expenseName: expense.name,
        expenseCost: expense.cost
      });
    })
  );
};

var Expense = function Expense(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "table",
      { "class": "expense" },
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { "class": "expense-name" },
          props.expenseName
        ),
        React.createElement(
          "td",
          { "class": "expense-cost" },
          "$ ",
          props.expenseCost
        ),
        React.createElement(
          "td",
          { "class": "expense-remove" },
          React.createElement(
            "button",
            null,
            "Remove"
          )
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(BudgetApp, null), document.getElementById('app'));
