import { Button } from "./common/Button/Button";

const Dev = () => {

    const handleClick = () => {
        console.log("Click");
    }

    return (
        <>
            <Button
                // variant="primary"
                onClick={handleClick}
                loading={false}
            >Click me</Button>
        </>
    )
}

export default Dev;