import './Graph.css'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF6666', '#AA66CC'];

const Graph = ({ spendingData }) => {
  return (
    <>
      <div className="Graph-sec">
        <div className="GraphHead">
          <h2>Spending BreakDown</h2>
        </div>

        {spendingData.length > 0 ? (
          <>
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={spendingData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  label={false}
                >

                  {spendingData.map((entry, index) => (
                    <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}

                </Pie>

                <Tooltip formatter={(value) => `₹${value}`} />
                  
              </PieChart>
            </ResponsiveContainer>

            {/* Category List */}
            <div className="CategoryContainer">

            
            <div className="category-list">
              {spendingData.map((item, index) => (
                <div className="category-item" key={index}>
                  {/* <div
                    className="color-dot"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div> */}
                  <div className="cat-name">{item.name}</div>
                  <div className="cat-value">₹{item.value}</div>
                </div>
              ))}
            </div>
            </div>
          </>
        ) : (
          <p className="empty-chart">No spending data yet</p>
        )}
      </div>
    </>
  );
};

export default Graph;
