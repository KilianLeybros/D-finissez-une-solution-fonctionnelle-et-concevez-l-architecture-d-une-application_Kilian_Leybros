package com.openclassrooms.ycyw_back.data.repository;

import com.openclassrooms.ycyw_back.data.model.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, UUID> {
    @Query(value = """
            SELECT sp.* FROM support_request sp
            LEFT JOIN message m on sp.id = m.support_request_id
            WHERE sp.id = :id
            ORDER BY m.created_at ASC""", nativeQuery = true)
    Optional<SupportRequest> findByIdWithSortedChildren(@Param("id") UUID id);


    @Query("SELECT sr FROM SupportRequest sr WHERE sr.messages IS NOT EMPTY")
    List<SupportRequest> findWithAtLeastOneMessage();
}
