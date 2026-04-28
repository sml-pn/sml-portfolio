<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$db_url = "postgresql://neondb_owner:npg_wOkELG2tR9vg@ep-lingering-firefly-anfqpvp0-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";
$conn = pg_connect($db_url);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = pg_query_params($conn,
        "INSERT INTO projetos (icone, titulo, descricao, tecnologias, link, gradient, bg_tag) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [$data['icone'], $data['titulo'], $data['descricao'], $data['tecnologias'], $data['link'], $data['gradient'], $data['bg_tag']]
    );
    echo json_encode(['status' => 'ok', 'mensagem' => 'Projeto salvo!']);
}

elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = pg_query($conn, "SELECT * FROM projetos ORDER BY criado_em DESC");
    $projetos = [];
    while ($row = pg_fetch_assoc($result)) {
        $row['tecnologias'] = json_decode($row['tecnologias']);
        $projetos[] = $row;
    }
    echo json_encode($projetos);
}

elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    pg_query_params($conn, "DELETE FROM projetos WHERE id = $1", [$id]);
    echo json_encode(['status' => 'ok']);
}
