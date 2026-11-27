import Icon from '@/components/common/Icon';

/** Animated app screens shown beside each project. */
const Rows = () => (
  <>
    <div className="m-row" />
    <div className="m-row short" />
  </>
);

const Meter = ({ label, value }) => (
  <div className="meter"><b>{label}</b><u style={{ '--v': `${value}%` }} /></div>
);

const Tiles = ({ items }) => (
  <div className="m-grid">
    {items.map(([icon, label], index) => (
      <i key={label} style={{ '--n': index }}><span><Icon name={icon} /></span>{label}</i>
    ))}
  </div>
);

export const mockups = {
  field: (
    <>
      <div className="m-head"><Icon name="react" /> revDSM</div>
      <div className="m-map">
        <svg viewBox="0 0 160 120" preserveAspectRatio="none">
          <path d="M14 100 C40 96 34 56 68 62 S104 98 120 64 S128 24 148 18" />
        </svg>
        <b className="pin p1" /><b className="pin p2" /><b className="pin p3" />
      </div>
      <Tiles items={[['users', 'Team'], ['home', 'Visits']]} />
      <Rows />
    </>
  ),
  social: (
    <>
      <div className="m-head"><Icon name="chat" /> RideArt</div>
      <div className="m-chat">
        <span className="bubble" /><span className="bubble mine" /><span className="bubble mid" />
        <span className="bubble mine short" />
        <span className="typing"><i /><i /><i /></span>
      </div>
      <div className="m-toast"><Icon name="bell" /> New message</div>
    </>
  ),
  construction: (
    <>
      <div className="m-head"><Icon name="home" /> Frjar</div>
      <div className="m-banner">All-in-one platform</div>
      <Tiles items={[['layers', 'Materials'], ['users', 'Consultants'], ['truck', 'Rentals'], ['wrench', 'Services']]} />
      <Rows />
    </>
  ),
  cycle: (
    <>
      <div className="m-head"><Icon name="calendar" /> Cycle Tracker</div>
      <div className="ring"><span>Day 14</span></div>
      <div className="m-week">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <i key={index} style={{ '--n': index }}>{day}</i>)}
      </div>
      <Rows />
    </>
  ),
  device: (
    <>
      <div className="m-head"><Icon name="cpu" /> Device Info</div>
      <Meter label="CPU" value={72} />
      <Meter label="RAM" value={54} />
      <Meter label="Battery" value={88} />
      <div className="m-bars">
        {Array.from({ length: 10 }, (_, index) => <i key={index} style={{ '--n': index }} />)}
      </div>
    </>
  ),
};
