/** Illustrative app screens shown beside each project. */
const Rows = () => (
  <>
    <div className="m-row" />
    <div className="m-row short" />
  </>
);

const Meter = ({ label, value }) => (
  <div className="meter"><b>{label}</b><u style={{ '--v': `${value}%` }} /></div>
);

export const mockups = {
  social: {
    theme: 's5',
    screen: (
      <>
        <div className="m-head">💬 RideArt</div>
        <div className="m-grid"><i>Feed</i><i>Chat</i><i>Alerts</i><i>Profile</i></div>
        <Rows />
      </>
    ),
  },
  field: {
    theme: 's4',
    screen: (
      <>
        <div className="m-head">📍 revDSM</div>
        <div className="m-grid"><i>Field</i><i>Team</i><i>Visits</i><i>Reports</i></div>
        <Rows />
      </>
    ),
  },
  construction: {
    theme: 's1',
    screen: (
      <>
        <div className="m-head">🏗️ Frjar</div>
        <div className="m-grid"><i>Materials</i><i>Consultants</i><i>Rentals</i><i>Services</i></div>
        <Rows />
      </>
    ),
  },
  cycle: {
    theme: 's2',
    screen: (
      <>
        <div className="m-head">🌸 Cycle Tracker</div>
        <div className="ring"><span>Day 14</span></div>
        <Rows />
      </>
    ),
  },
  device: {
    theme: 's3',
    screen: (
      <>
        <div className="m-head">🧠 Device Info</div>
        <Meter label="CPU" value={72} />
        <Meter label="RAM" value={54} />
        <Meter label="Battery" value={88} />
        <Meter label="Storage" value={41} />
      </>
    ),
  },
};
