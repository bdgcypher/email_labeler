
import { RiCloseFill } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { CardSwiper } from './card_swiper_function';

export default function SwipingInterface() {

    const handleSwipe = (d: any) => {
        //fill this with callback
        if (d === "right") {
            console.log("yes I wanted a notification")
        } else if (d === "left") {
            console.log("no I didn't want one")
        }
    };

    return (
        <div className="bg-gray-100 p-10 md:p-20 lg:px-40 md:mx-auto rounded-md">

            <CardSwiper
                onSwipe={handleSwipe}
                detectingSize={100}
                className="h-96 m-auto -mt-40 bg-white rounded-md p-8 overflow-y-auto shadow-xl border-b-8 border-b-white"
                contents={
                    //Email content will go here vvv
                    <>
                        <div className="flex flex-row">
                            <h1 className="text-md text-gray-900">From:</h1>
                            <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">gravida arcu ac</p>
                        </div>
                        <div className="flex flex-row mt-2">
                            <h1 className="text-md text-gray-900">Title:</h1>
                            <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">tortor aliquam nulla facilisi cras fermentum odio</p>
                        </div>
                        <div className="flex flex-row mt-8">
                            <p className="text-xs md:text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Nulla facilisi morbi tempus iaculis urna. Nec nam
                                aliquam sem et tortor consequat id. Vitae nunc sed velit dignissim sodales ut eu. Mauris augue
                                neque gravida in fermentum et sollicitudin ac. Leo a diam sollicitudin tempor id. Pharetra convallis
                                posuere morbi leo urna molestie. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Tellus rutrum tellus pellentesque eu. Pretium quam vulputate dignissim suspendisse in est.
                                Aliquet sagittis id consectetur purus ut faucibus. Enim lobortis scelerisque fermentum dui
                                faucibus in ornare quam viverra. Faucibus in ornare quam viverra orci sagittis. Id aliquet risus feugiat in ante.
                                Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Eget dolor morbi non arcu risus quis varius quam.
                                Faucibus a pellentesque sit amet porttitor eget. Feugiat nisl pretium fusce id velit. Dictum non consectetur a erat nam.
                                Sit amet consectetur adipiscing elit ut aliquam purus sit. At tempor commodo ullamcorper a. Lacus viverra vitae
                                congue eu consequat ac felis donec et. Consectetur purus ut faucibus pulvinar elementum integer enim neque.
                                Sed augue lacus viverra vitae congue eu consequat ac. Orci porta non pulvinar neque laoreet.
                                Sed arcu non odio euismod lacinia at. Tincidunt augue interdum velit euismod in pellentesque massa.
                                Congue eu consequat ac felis donec et odio pellentesque diam. Ipsum suspendisse ultrices gravida dictum
                                fusce ut placerat. Tellus at urna condimentum mattis pellentesque id. Vel elit scelerisque mauris pellentesque.
                                Donec et odio pellentesque diam volutpat commodo sed. Nunc consequat interdum varius sit.
                                Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia.
                            </p>
                        </div>
                    </>
                }
            />
            <CardSwiper
                onSwipe={handleSwipe}
                className="h-96 m-auto -mt-96 bg-white rounded-md p-2 overflow-y-auto shadow-xl border-b-8 border-b-white"
                contents={
                    //Email content will go here vvv
                    <>
                        <img src="email_example.jpg" className="mx-auto" />
                    </>
                }
            />
            <CardSwiper
                onSwipe={handleSwipe}
                className="h-96 m-auto -mt-96 bg-white rounded-md p-8 overflow-y-auto shadow-xl border-b-8 border-b-white"
                contents={
                    //Email content will go here vvv
                    <>
                        <div className="flex flex-row">
                            <h1 className="text-md text-gray-900">From:</h1>
                            <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">gravida arcu ac</p>
                        </div>
                        <div className="flex flex-row mt-2">
                            <h1 className="text-md text-gray-900">Title:</h1>
                            <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">tortor aliquam nulla facilisi cras fermentum odio</p>
                        </div>
                        <div className="flex flex-row mt-8">
                            <p className="text-xs md:text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Nulla facilisi morbi tempus iaculis urna. Nec nam
                                aliquam sem et tortor consequat id. Vitae nunc sed velit dignissim sodales ut eu. Mauris augue
                                neque gravida in fermentum et sollicitudin ac. Leo a diam sollicitudin tempor id. Pharetra convallis
                                posuere morbi leo urna molestie. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Tellus rutrum tellus pellentesque eu. Pretium quam vulputate dignissim suspendisse in est.
                                Aliquet sagittis id consectetur purus ut faucibus. Enim lobortis scelerisque fermentum dui
                                faucibus in ornare quam viverra. Faucibus in ornare quam viverra orci sagittis. Id aliquet risus feugiat in ante.
                                Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Eget dolor morbi non arcu risus quis varius quam.
                                Faucibus a pellentesque sit amet porttitor eget. Feugiat nisl pretium fusce id velit. Dictum non consectetur a erat nam.
                                Sit amet consectetur adipiscing elit ut aliquam purus sit. At tempor commodo ullamcorper a. Lacus viverra vitae
                                congue eu consequat ac felis donec et. Consectetur purus ut faucibus pulvinar elementum integer enim neque.
                                Sed augue lacus viverra vitae congue eu consequat ac. Orci porta non pulvinar neque laoreet.
                                Sed arcu non odio euismod lacinia at. Tincidunt augue interdum velit euismod in pellentesque massa.
                                Congue eu consequat ac felis donec et odio pellentesque diam. Ipsum suspendisse ultrices gravida dictum
                                fusce ut placerat. Tellus at urna condimentum mattis pellentesque id. Vel elit scelerisque mauris pellentesque.
                                Donec et odio pellentesque diam volutpat commodo sed. Nunc consequat interdum varius sit.
                                Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia.
                            </p>
                        </div>
                    </>
                }
            />
            <CardSwiper
                onSwipe={handleSwipe}
                className="h-96 m-auto -mt-96 bg-white rounded-md p-8 overflow-y-auto shadow-xl border-b-8 border-b-white"
                contents={
                    //Email content will go here vvv
                    <>
                        <div className="flex flex-row">
                            <h1 className="text-md text-gray-900">From:</h1>
                            <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">gravida arcu ac</p>
                        </div>
                        <div className="flex flex-row mt-2">
                            <h1 className="text-md text-gray-900">Title:</h1>
                            <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">tortor aliquam nulla facilisi cras fermentum odio</p>
                        </div>
                        <div className="flex flex-row mt-8">
                            <p className="text-xs md:text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Nulla facilisi morbi tempus iaculis urna. Nec nam
                                aliquam sem et tortor consequat id. Vitae nunc sed velit dignissim sodales ut eu. Mauris augue
                                neque gravida in fermentum et sollicitudin ac. Leo a diam sollicitudin tempor id. Pharetra convallis
                                posuere morbi leo urna molestie. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
                                Tellus rutrum tellus pellentesque eu. Pretium quam vulputate dignissim suspendisse in est.
                                Aliquet sagittis id consectetur purus ut faucibus. Enim lobortis scelerisque fermentum dui
                                faucibus in ornare quam viverra. Faucibus in ornare quam viverra orci sagittis. Id aliquet risus feugiat in ante.
                                Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Eget dolor morbi non arcu risus quis varius quam.
                                Faucibus a pellentesque sit amet porttitor eget. Feugiat nisl pretium fusce id velit. Dictum non consectetur a erat nam.
                                Sit amet consectetur adipiscing elit ut aliquam purus sit. At tempor commodo ullamcorper a. Lacus viverra vitae
                                congue eu consequat ac felis donec et. Consectetur purus ut faucibus pulvinar elementum integer enim neque.
                                Sed augue lacus viverra vitae congue eu consequat ac. Orci porta non pulvinar neque laoreet.
                                Sed arcu non odio euismod lacinia at. Tincidunt augue interdum velit euismod in pellentesque massa.
                                Congue eu consequat ac felis donec et odio pellentesque diam. Ipsum suspendisse ultrices gravida dictum
                                fusce ut placerat. Tellus at urna condimentum mattis pellentesque id. Vel elit scelerisque mauris pellentesque.
                                Donec et odio pellentesque diam volutpat commodo sed. Nunc consequat interdum varius sit.
                                Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia.
                            </p>
                        </div>
                    </>
                }
            />
            <div className="absolute bottom-1/3 left-0 h-12 lg:h-20 w-8 lg:w-20 pt-4 lg:pt-6 pl-2 lg:pl-6 bg-red-200 rounded-r-full shadow-xl">
                <RiCloseFill className="text-red-700 lg:text-3xl" />
            </div>
            <div className="absolute bottom-1/3 right-0 h-12 lg:h-20 w-8 lg:w-20 pt-4 lg:pt-6 pl-2 lg:pl-8 bg-green-200 rounded-l-full shadow-xl">
                <AiOutlineCheck className="text-green-700 lg:text-3xl" />
            </div>
        </div>
    );
}