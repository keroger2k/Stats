import './Chevron.scss';

function Chevron() {
    return (
        <svg width="16" height="16" viewBox="0 0 14 14" data-testid="icon-chevron">
            <path
                className="Icon__cool-grey-dark Icon__fill"
                d="M1.079 13c-.277 0-.553-.106-.763-.317-.421-.424-.421-1.109 0-1.532L4.949 6.5.316 1.848C-.105 1.426-.105.741.316.318c.421-.424 1.104-.424 1.526 0L8 6.5l-6.158 6.183c-.21.21-.487.317-.763.317"
                fillRule="evenodd"
            ></path>
        </svg>
    );
}

export default Chevron;