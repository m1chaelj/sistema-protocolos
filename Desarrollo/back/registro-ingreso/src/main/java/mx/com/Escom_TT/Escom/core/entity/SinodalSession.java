package mx.com.Escom_TT.Escom.core.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class SinodalSession {
    private Sinodal sinodal;
    private String token;
}
