<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search PHP</title>

    <link rel="stylesheet" href="../css/search.css">
    <link rel="icon" href="../img/iconcircle.jpg">
</head>

<body>

    <section class="container">
        <div>
            <h2 class="title_effect">Bonjour</h2>

            <?php
            function linebreak()
            {
                echo nl2br("\n");
            }



            $message = "hello";
            echo $message; ?>

            <br>

            <p>Votre recherche :</p>

            <?php
            // echo $_POST["search_request"];
            if (isset($_POST["search_request"])) {
                echo htmlspecialchars($_POST["search_request"]);
                linebreak();
            } else if (defined('$_POST') == false) {
                echo 'La requête est vide !';
            }
            linebreak();
            if (isset($_POST["search_request"])) {
                if ($_POST["search_request"] == 666) {
                    echo htmlspecialchars("C'est bien le nombre 666 !");
                    linebreak();
                }
            }
            for ($i = 0; $i < 10; $i++) {
                echo $i + 1;
                linebreak();
            }

            $tableau1 = ["Hello", "Bonjour", "Güten Tag"];
            echo "Le tableau 1 fait ";
            echo count($tableau1);
            echo " éléments de long.";
            linebreak();
            for ($i = 0; $i < count($tableau1); $i++) {
                echo $tableau1[$i];
                if ($i == count($tableau1) - 1) {
                    break;
                }
                echo " ,";
            }
            ?>
        </div>
        <div class="linkContainer">
            <a href="../../index.html" class="homeLink">Accueil</a>
        </div>
    </section>
</body>

</html>