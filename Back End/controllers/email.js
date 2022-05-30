const html = `<html>

<head>
    <style>
        .colored {
            color: blue;
        }

        #body {
            background-color: #80808021
            font-size: 18px;
            border: 1px solid #80808021;
            padding:20px;
        }


        .center{
            margin: auto;
            width: 50%;
        }
       .mobile {
            display: none;
        }
        .web {
            display:block;
        } 
      
        .button {

        }
        
        @media only screen and (max-device-width : 640px) {

            /* Styles */
            .mobile {
                display: block;
            }
            .web {
                display:none;
            }
        }

        @media only screen and (max-device-width: 768px) {

            /* Styles */
            .mobile {
                display: block;
            }
            .web {
                display:none;
            }
        } 
    </style>
</head>

<body>
    <div id='body' class="center">
        <p class='center'><h3>Hi User</h3></p>
        <p class='colored'>
        You have one customer interested in your propertym. 
        </p>
        <p>See who<br></p><br>
        <a href="https://real-dapp-blog.herokuapp.com/" style="text-decoration:none;
    width: 150px; padding: 15px;font-weight: MEDIUM; background:#767c6e; color: #000000; 
    cursor: pointer;
    font-size: 110%;">Click Here</a>
</p>
        <br/>
        <br/>
        <p>Thanks & Regards, 
        <br /> Team Real DApp</p>
    </div>
</body>

</html>`

module.exports = html;