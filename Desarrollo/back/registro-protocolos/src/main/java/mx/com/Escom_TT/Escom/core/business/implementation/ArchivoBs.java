package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.ArchivoService;
import mx.com.Escom_TT.Escom.core.business.output.ArchivoRepository;
import mx.com.Escom_TT.Escom.core.entity.Archivo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@ApplicationScoped
public class ArchivoBs implements ArchivoService {

    private static final String UPLOAD_DIR = "uploads";

    @Inject
    ArchivoRepository archivoRepository;

    @Override
    public Either<ErrorCodesEnum, Archivo> uploadFile(String fileName, InputStream inputStream, Archivo entity) {

        Either<ErrorCodesEnum, Archivo> saveResult;

        if (!fileName.endsWith(".pdf")) {
            return Either.left(ErrorCodesEnum.BAD_REQUEST);
        }

        Path uploadFolder = Paths.get(UPLOAD_DIR);
        File folder = uploadFolder.toFile();
        if (!folder.exists() && !folder.mkdirs()) {
            return Either.left(ErrorCodesEnum.BAD_REQUEST);
        }

        Path filePath = uploadFolder.resolve(fileName);
        File file = filePath.toFile();

        if (file.exists()) {
            return Either.left(ErrorCodesEnum.ERROR);
        }

        boolean isSaved = saveFile(inputStream, file);
        if (!isSaved) {
            return Either.left(ErrorCodesEnum.ERROR);
        }

        byte[] fileContent = readFileAsBytes(file);
        if (fileContent == null) {
            return Either.left(ErrorCodesEnum.ERROR);
        }

        entity.setFilePath(Path.of(filePath.toString()));
        entity.setArchivo(fileContent);

        Archivo archivo = archivoRepository.save(entity);
        saveResult = Either.right(archivo);

        return saveResult;
    }

    private boolean saveFile(InputStream inputStream, File file) {
        if (inputStream == null || file == null) {
            return false;
        }

        try (var outputStream = new java.io.FileOutputStream(file)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            return true;
        } catch (Exception e) {
            log.error("Error saving file to disk", e);
            return false;
        }
    }

    private byte[] readFileAsBytes(File file) {
        try (var inputStream = new java.io.FileInputStream(file);
             var byteArrayOutputStream = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }

            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            log.error("Error reading file as bytes", e);
            return null;
        }
    }





}
