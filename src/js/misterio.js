function crearCalendarioLiga(equipos) {
    const numEquipos = equipos.length;
    const numJornadas = numEquipos - 1;
    const calendario = [];
  
    // Crear la primera jornada
    for (let i = 0; i < numEquipos / 2; i++) {
      calendario.push([equipos[i], equipos[numEquipos - i - 1]]);
    }
  
    // Generar las siguientes jornadas rotando los equipos
    for (let jornada = 1; jornada < numJornadas; jornada++) {
      const nuevaJornada = [];
      for (let i = 0; i < numEquipos / 2; i++) {
        const equipo1 = equipos[i];
        const equipo2 = equipos[numEquipos - i - 1];
  
        // Rotar los equipos a excepción del primer equipo
        nuevaJornada.push([equipo1, equipos[(numEquipos / 2 + i + jornada) % (numEquipos - 1) + 1]]);
      }
      calendario.push(nuevaJornada);
    }
  
    return calendario;
  }
  
  // Ejemplo de uso
  const equipos = ['Equipo 1', 'Equipo 2', 'Equipo 3', /* ... hasta 'Equipo 12' */];
  const calendarioLiga = crearCalendarioLiga(equipos);
  
  console.log(calendarioLiga);