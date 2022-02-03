
import { RiCloseFill } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { CardSwiper } from './card_swiper_function';
import * as rasterizeHTML from 'rasterizehtml';
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Domain, apiKey } from '../domain';

const cookies = new Cookies();

const user = cookies.get('user');

const dataset_id = cookies.get('dataset_id');
// actual code ^^^
// const dataset_id = 'test';

var datasetExamples = [];


export default function SwipingInterface() {

    const getDatasetStats = () => {
        try {
            axios.get(`${Domain}dataset/${dataset_id}/stats`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => { console.log(response); cookies.set('datasetStats', response.data); });
        } catch (err) {
            console.log(err);
        }
    }

    console.log(dataset_id)
    console.log(user.token)

    const getDatasetExamples = () => {
        try {
            let numOfExamples = '5'
            axios.get(`${Domain}content/${dataset_id}/${numOfExamples}`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => { console.log(response); cookies.set('datasetExamples', response.data); });
        } catch (err) {
            console.log(err);
        }
    }

    datasetExamples = cookies.get('datasetExamples');

    var batchLabelCounter = 0

    const handleSwipe = (direction: any, uuid: any) => {
        //fill this with callback
        if (direction === "right") {

            let body = {
                "uuid": uuid,
                "sentiment": true
            }

            try {
                axios.post(`${Domain}content/${dataset_id}`, {
                    headers: {
                        "Api-Key": apiKey,
                        "Authorization": user.token
                    },
                    body
                }).then(response => { console.log(response); batchLabelCounter === 4 ? getDatasetExamples() : batchLabelCounter ++ });
            } catch (err) {
                console.log(err);
            }
            console.log("yes I wanted a notification")
        } else if (direction === "left") {

            let body = {
                "uuid": uuid,
                "sentiment": false
            }

            try {
                axios.post(`${Domain}content/${dataset_id}`, {
                    headers: {
                        "Api-Key": apiKey,
                        "Authorization": user.token
                    },
                    body
                }).then(response => { console.log(response); batchLabelCounter === 4 ? getDatasetExamples() : batchLabelCounter ++ });
            } catch (err) {
                console.log(err);
            }
            console.log("no I didn't want a notification")
        }
    };

    // var canvas = document.getElementById("canvas"),
    //     html = `
    // <!DOCTYPE html>
    // <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    // <head>
    //   <meta charset="UTF-8">
    //   <meta name="viewport" content="width=device-width,initial-scale=1">
    //   <meta name="x-apple-disable-message-reformatting">
    //   <title></title>
    //   <!--[if mso]>
    //   <noscript>
    //     <xml>
    //       <o:OfficeDocumentSettings>
    //         <o:PixelsPerInch>96</o:PixelsPerInch>
    //       </o:OfficeDocumentSettings>
    //     </xml>
    //   </noscript>
    //   <![endif]-->
    //   <style>
    //     table, td, div, h1, p {font-family: Arial, sans-serif;}
    //   </style>
    // </head>
    // <body style="margin:0;padding:0;">
    //   <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    //     <tr>
    //       <td align="center" style="padding:0;">
    //         <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
    //           <tr>
    //             <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
    //               <img src="https://assets.codepen.io/210284/h1.png" alt="" width="300" style="height:auto;display:block;" />
    //             </td>
    //           </tr>
    //           <tr>
    //             <td style="padding:36px 30px 42px 30px;">
    //               <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
    //                 <tr>
    //                   <td style="padding:0 0 36px 0;color:#153643;">
    //                     <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Creating Email Magic</h1>
    //                     <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan et dictum, nisi libero ultricies ipsum, posuere neque at erat.</p>
    //                     <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p>
    //                   </td>
    //                 </tr>
    //                 <tr>
    //                   <td style="padding:0;">
    //                     <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
    //                       <tr>
    //                         <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
    //                           <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/left.gif" alt="" width="260" style="height:auto;display:block;" /></p>
    //                           <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, est nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
    //                           <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">Blandit ipsum volutpat sed</a></p>
    //                         </td>
    //                         <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
    //                         <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
    //                           <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/right.gif" alt="" width="260" style="height:auto;display:block;" /></p>
    //                           <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Morbi porttitor, eget est accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed.</p>
    //                           <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p>
    //                         </td>
    //                       </tr>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td style="padding:30px;background:#ee4c50;">
    //               <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
    //                 <tr>
    //                   <td style="padding:0;width:50%;" align="left">
    //                     <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
    //                       &reg; Someone, Somewhere 2021<br/><a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Unsubscribe</a>
    //                     </p>
    //                   </td>
    //                   <td style="padding:0;width:50%;" align="right">
    //                     <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
    //                       <tr>
    //                         <td style="padding:0 0 0 10px;width:38px;">
    //                           <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
    //                         </td>
    //                         <td style="padding:0 0 0 10px;width:38px;">
    //                           <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
    //                         </td>
    //                       </tr>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </td>
    //           </tr>
    //         </table>
    //       </td>
    //     </tr>
    //   </table>
    // </body>
    // </html>`;

    // rasterizeHTML.drawHTML(html, canvas);

    return (
        <div className="bg-gray-100 p-10 md:p-20 lg:px-40 md:mx-auto rounded-md">
            <button onClick={getDatasetExamples} className="h-10 w-20 bg-blue-600">
                click me
            </button>
            {
                datasetExamples ? datasetExamples.map(example => (
                    <>
                        <CardSwiper
                            onSwipe={handleSwipe}
                            detectingSize={100}
                            className="h-96 m-auto -mt-40 bg-white rounded-md p-8 overflow-y-auto shadow-xl border-b-8 border-b-white opacity-95"
                            contents={
                                //Email content will go here vvv
                                <>
                                    <div className="flex flex-row">
                                        <h1 className="text-md text-gray-900">From:</h1>
                                        <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">{example.from}</p>
                                    </div>
                                    <div className="flex flex-row mt-2">
                                        <h1 className="text-md text-gray-900">Subject:</h1>
                                        <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1">{example.subject}</p>
                                    </div>
                                    <div className="flex flex-row mt-8">
                                        <p className="text-xs md:text-sm text-gray-500">
                                            {example.display}
                                        </p>
                                    </div>
                                </>
                            }
                        />
                    </>
                ))
            : null }
            <div className="absolute bottom-1/3 left-0 h-12 lg:h-20 w-8 lg:w-20 pt-4 lg:pt-6 pl-2 lg:pl-6 bg-red-200 rounded-r-full shadow-xl">
                <RiCloseFill className="text-red-700 lg:text-3xl" />
            </div>
            <div className="absolute bottom-1/3 right-0 h-12 lg:h-20 w-8 lg:w-20 pt-4 lg:pt-6 pl-2 lg:pl-8 bg-green-200 rounded-l-full shadow-xl">
                <AiOutlineCheck className="text-green-700 lg:text-3xl" />
            </div>
        </div>
    );
}